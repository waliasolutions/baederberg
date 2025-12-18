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
import { Trash2, UserPlus, Shield, Edit2, Users } from 'lucide-react';
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

      // For now, we show user_id since we can't access auth.users directly
      // In production, you'd use an edge function to get user emails
      setUsers((data || []).map(u => ({
        ...u,
        role: u.role as 'admin' | 'editor',
        email: u.user_id // We'll show user_id for now
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

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setIsAdding(true);
    try {
      // Note: In production, you'd invite users via Supabase Auth
      // For now, we add a role entry for an existing user ID
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: newEmail, // This should be a valid UUID
          role: newRole
        });

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Benutzerrolle wurde hinzugefügt'
      });
      
      setNewEmail('');
      setNewRole('editor');
      fetchUsers();
    } catch (err) {
      toast({
        title: 'Fehler',
        description: 'Benutzerrolle konnte nicht hinzugefügt werden. Stellen Sie sicher, dass die User-ID gültig ist.',
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
    // Prevent deleting yourself
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

        {/* Add User Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Benutzerrolle hinzufügen
            </CardTitle>
            <CardDescription>
              Fügen Sie einem existierenden Benutzer eine Rolle hinzu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="userId" className="sr-only">User ID</Label>
                <Input
                  id="userId"
                  placeholder="User ID (UUID)"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
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
                {isAdding ? 'Wird hinzugefügt...' : 'Hinzufügen'}
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
              <div className="text-slate-500 py-8 text-center">Laden...</div>
            ) : users.length === 0 ? (
              <div className="text-slate-500 py-8 text-center">
                Keine Benutzer gefunden
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
                        <p className="font-medium text-slate-900 text-sm truncate max-w-[200px]">
                          {u.user_id}
                          {u.user_id === user?.id && (
                            <span className="ml-2 text-xs text-slate-500">(Sie)</span>
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
