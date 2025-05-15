'use client';

import { useState } from 'react';
import Image from 'next/image';

import updateUsersBio from '@/actions/updateUsersBio';
import { UserWithEssays } from '@/lib/types';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  SaveIcon,
  Loader2Icon,
  PencilIcon,
  Edit3Icon,
  HeartIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  XIcon,
} from 'lucide-react';
import TooltipItem from '@/components/TooltipItem';
import InfoBox from '@/components/InfoBox';

type Props = {
  userData: UserWithEssays;
  canEdit?: boolean;
};

const UsersInfo = ({ userData, canEdit }: Props) => {
  const [bio, setBio] = useState(userData.bio || '');
  const [editing, setEditing] = useState(false); // textarea se aktivira samo ako je editing true
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
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
            {canEdit && !editing ? (
              <TooltipItem
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditing(true)}
                  >
                    {/* Prikaži textarea za izmenu opisa */}
                    <Edit3Icon className="mr-1 h-4 w-4" />{' '}
                  </Button>
                }
                content="Izmeni opis profila"
              />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditing(false)}
              >
                {/* Sakrij textarea */}
                <XIcon className="mr-1 h-4 w-4" />{' '}
              </Button>
            )}
          </div>

          {canEdit ? (
            <>
              {editing ? (
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setBio(e.target.value);
                    }
                  }}
                  placeholder="Napiši nešto o sebi..."
                  className="min-h-[120px]"
                  disabled={!editing}
                />
              ) : (
                <div className="text-muted-foreground text-sm whitespace-pre-line">
                  {bio}
                </div>
              )}

              {editing && (
                <p className="text-muted-foreground text-right text-sm">
                  {bio.length}/500
                </p>
              )}

              {editing && (
                <Button
                  onClick={handleSave}
                  className="mt-2 w-full md:w-auto"
                  size="sm"
                  disabled={loading || bio.length === 0 || bio === userData.bio}
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
            <div className="text-muted-foreground text-sm whitespace-pre-line">
              {bio || (
                <InfoBox message="Korisnik još uvek nema opis profila." />
              )}
            </div>
          )}
        </div>
      </CardContent>

      {/** TODO: Ocenjivanje korisnika */}
      {/* <CardFooter className="flex items-center justify-end gap-2">
        <Button variant={'outline'}>
          <ThumbsUpIcon /> (0)
        </Button>
        <Button variant={'outline'}>
          <ThumbsDownIcon /> (0)
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default UsersInfo;
