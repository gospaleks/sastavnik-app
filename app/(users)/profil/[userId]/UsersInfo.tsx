'use client';

import { useState } from 'react';
import Image from 'next/image';

import updateUsersBio from '@/actions/updateUsersBio';
import { UserWithEssays } from '@/lib/types';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { SaveIcon, Loader2Icon, PencilIcon, Edit3Icon } from 'lucide-react';
import TooltipItem from '@/components/TooltipItem';

type Props = {
  userData: UserWithEssays;
  canEdit?: boolean;
};

const UsersInfo = ({ userData, canEdit }: Props) => {
  const [bio, setBio] = useState(userData.bio || '');
  const [editing, setEditing] = useState(false); // textarea se aktivira samo ako je editing true
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!bio) {
      toast.error('Morate uneti opis pre čuvanja');
      return;
    }

    setLoading(true);
    const response = await updateUsersBio(userData.id, bio);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      setEditing(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-col items-center gap-4">
        <Image
          src={userData.image || '/default_avatar.png'}
          alt={`${userData.firstName} ${userData.lastName}`}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full border object-cover"
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-muted-foreground">{userData.email}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bio">O meni:</Label>
            {canEdit && !editing && (
              <TooltipItem
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditing(true)}
                  >
                    {/* Klikom na olovku se omogucava textarea i pojavljuje se save dugme */}
                    <Edit3Icon className="mr-1 h-4 w-4" />{' '}
                  </Button>
                }
                content="Izmeni opis profila"
              />
            )}
          </div>

          {canEdit ? (
            <>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Napiši nešto o sebi..."
                className="min-h-[120px]"
                disabled={!editing}
              />
              {editing && (
                <Button
                  onClick={handleSave}
                  className="mt-2 w-full md:w-auto"
                  size="sm"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2Icon className="animate-spin" />
                      Čuvanje...
                    </>
                  ) : (
                    <>
                      <SaveIcon />
                      Sačuvaj opis
                    </>
                  )}
                </Button>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-sm whitespace-pre-line">
              {bio || (
                <span className="italic">Korisnik još nije dodao opis.</span>
              )}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersInfo;
