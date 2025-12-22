import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen haben'),
});

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showBootstrap, setShowBootstrap] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const { signIn, signUp, user, isAdmin, isEditor, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in and has role
  useEffect(() => {
    if (!isLoading && user && (isAdmin || isEditor)) {
      navigate('/admin');
    }
  }, [user, isAdmin, isEditor, isLoading, navigate]);

  // Check if user is logged in but has no role (needs bootstrap)
  useEffect(() => {
    if (!isLoading && user && !isAdmin && !isEditor) {
      checkIfFirstAdmin();
    }
  }, [user, isAdmin, isEditor, isLoading]);

  const checkIfFirstAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);
      
      if (!error && (!data || data.length === 0)) {
        setShowBootstrap(true);
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
    }
  };

  const handleBootstrap = async () => {
    setIsBootstrapping(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Bitte melden Sie sich zuerst an');
        return;
      }

      const { data, error } = await supabase.functions.invoke('bootstrap-admin', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      if (data.success) {
        toast.success('Sie sind jetzt Administrator!');
        // Refresh the page to update auth state
        window.location.reload();
      } else {
        toast.error(data.error || 'Bootstrap fehlgeschlagen');
      }
    } catch (error: any) {
      console.error('Bootstrap error:', error);
      toast.error('Bootstrap fehlgeschlagen: ' + (error.message || 'Unbekannter Fehler'));
    } finally {
      setIsBootstrapping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate input
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    if (activeTab === 'login') {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Ungültige Anmeldedaten');
        } else {
          toast.error(error.message);
        }
        setIsSubmitting(false);
        return;
      }
      
      toast.success('Erfolgreich angemeldet');
    } else {
      const { error } = await signUp(email, password);
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('E-Mail bereits registriert');
        } else {
          toast.error(error.message);
        }
        setIsSubmitting(false);
        return;
      }
      
      toast.success('Konto erstellt! Bitte prüfen Sie Ihre E-Mail zur Bestätigung.');
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-500">Laden...</div>
      </div>
    );
  }

  // Show bootstrap option if user is logged in but has no role
  if (showBootstrap && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Erster Administrator</CardTitle>
            <CardDescription>
              Es wurde noch kein Administrator eingerichtet. Möchten Sie der erste Administrator werden?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Als Administrator können Sie alle Inhalte verwalten, Benutzer einladen und das Design anpassen.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={handleBootstrap} 
              className="w-full" 
              disabled={isBootstrapping}
            >
              {isBootstrapping ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Wird eingerichtet...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Zum Administrator werden
                </>
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Angemeldet als: {user.email}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">CMS Zugang</CardTitle>
          <CardDescription>
            Melden Sie sich an oder erstellen Sie ein Konto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Anmelden</TabsTrigger>
              <TabsTrigger value="signup">Registrieren</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
              
              <TabsContent value="login" className="mt-0 pt-0">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Anmelden...' : 'Anmelden'}
                </Button>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0 pt-0">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Registrieren...' : 'Konto erstellen'}
                </Button>
              </TabsContent>
            </form>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>Nur für autorisierte Benutzer.</p>
            <p className="mt-1">
              <a href="/" className="text-primary hover:underline">
                Zurück zur Website
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
