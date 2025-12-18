import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, UserPlus, Shield, Users, Mail, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'editor';
  created_at: string;
  email?: string;
}

export function UserManagement() {
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'editor'>('editor');
  const [isAdding, setIsAdding] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers((data || []).map(u => ({
        ...u,
        role: u.role as 'admin' | 'editor',
      })));
    } catch (err) {
      toast({
        title: 'Fehler',
        description: 'Benutzer konnten nicht geladen werden',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast({
        title: 'Ungültige E-Mail',
        description: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        variant: 'destructive'
      });
      return;
    }

    setIsAdding(true);
    try {
      const { data, error } = await supabase.functions.invoke('invite-user', {
        body: { email: newEmail, role: newRole }
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      toast({
        title: 'Erfolg',
        description: data?.message || 'Einladung wurde gesendet'
      });
      
      setNewEmail('');
      setNewRole('editor');
      fetchUsers();
    } catch (err: any) {
      toast({
        title: 'Fehler',
        description: err.message || 'Einladung konnte nicht gesendet werden',
        variant: 'destructive'
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: 'admin' | 'editor') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Rolle wurde aktualisiert'
      });
      
      fetchUsers();
    } catch (err) {
      toast({
        title: 'Fehler',
        description: 'Rolle konnte nicht aktualisiert werden',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === user?.id) {
      toast({
        title: 'Fehler',
        description: 'Sie können sich nicht selbst entfernen',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Benutzerrolle wurde entfernt'
      });
      
      fetchUsers();
    } catch (err) {
      toast({
        title: 'Fehler',
        description: 'Benutzerrolle konnte nicht entfernt werden',
        variant: 'destructive'
      });
    }
  };

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Zugriff verweigert</h2>
            <p className="text-slate-500">Nur Administratoren können Benutzer verwalten.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Benutzerverwaltung</h1>
          <p className="text-slate-500 mt-1">
            Verwalten Sie Administratoren und Editoren
          </p>
        </div>

        {/* Invite User Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Benutzer einladen
            </CardTitle>
            <CardDescription>
              Senden Sie eine Einladung per E-Mail an einen neuen Benutzer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInviteUser} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="email" className="sr-only">E-Mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@beispiel.ch"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-40">
                <Label htmlFor="role" className="sr-only">Rolle</Label>
                <Select value={newRole} onValueChange={(v) => setNewRole(v as 'admin' | 'editor')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={isAdding || !newEmail.trim()}>
                {isAdding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  'Einladen'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Benutzer mit CMS-Zugang
            </CardTitle>
            <CardDescription>
              {users.length} Benutzer haben Zugang zum CMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : users.length === 0 ? (
              <div className="text-slate-500 py-8 text-center">
                Keine Benutzer gefunden. Laden Sie den ersten Benutzer ein!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {users.map((u) => (
                  <div 
                    key={u.id} 
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        u.role === 'admin' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <Shield size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm truncate max-w-[250px]">
                          {u.user_id}
                          {u.user_id === user?.id && (
                            <span className="ml-2 text-xs bg-slate-100 px-2 py-0.5 rounded">(Sie)</span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500">
                          Hinzugefügt: {new Date(u.created_at).toLocaleDateString('de-CH')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Select 
                        value={u.role} 
                        onValueChange={(v) => handleUpdateRole(u.user_id, v as 'admin' | 'editor')}
                        disabled={u.user_id === user?.id}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            disabled={u.user_id === user?.id}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Benutzerrolle entfernen?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Der Benutzer verliert seinen Zugang zum CMS. Diese Aktion kann nicht rückgängig gemacht werden.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(u.user_id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Entfernen
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
