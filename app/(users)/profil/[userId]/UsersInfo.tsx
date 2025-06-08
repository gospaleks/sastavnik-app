'use client';

import { useState } from 'react';

import updateUsersBio from '@/actions/user/updateUsersBio';
import { UserWithEssays } from '@/lib/types';

import TooltipItem from '@/components/TooltipItem';
import InfoBox from '@/components/InfoBox';
import MyAvatar from '@/components/MyAvatar';
import SocialLinks from './SocialLinks';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
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
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center gap-4">
        <MyAvatar
          imageUrl={userData.image}
          fallbackText={`${userData.firstName?.[0] || ''}${userData.lastName?.[0] || ''}`}
          className="h-24 w-24 border"
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">
            {userData.firstName} {userData.lastName}
          </h2>
          {canEdit && <p className="text-muted-foreground">{userData.email}</p>}
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
                    <Edit3Icon className="h-4 w-4" />
                  </Button>
                }
                content="Izmeni opis profila"
              />
            ) : (
              canEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(false)}
                >
                  {/* Sakrij textarea */}
                  <XIcon className="h-4 w-4" />
                </Button>
              )
            )}
          </div>

          {canEdit ? (
            <>
              {editing ? (
                <div className="relative">
                  <Textarea
                    id="bio"
                    value={bio}
                    maxLength={500}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) {
                        setBio(e.target.value);
                      }
                    }}
                    placeholder="Napiši nešto o sebi..."
                    className="min-h-[140px] pb-10"
                    disabled={!editing}
                  />

                  <p className="text-muted-foreground absolute right-2 bottom-2 text-right text-sm">
                    {bio.length}/500
                  </p>
                </div>
              ) : bio.length > 0 ? (
                <div className="text-muted-foreground text-sm break-words whitespace-pre-line">
                  {bio}
                </div>
              ) : (
                <InfoBox message="Korisnik još uvek nema opis profila." />
              )}

              {editing && (
                <Button
                  onClick={handleSave}
                  className="mt-2 w-full"
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

        <Separator />

        <SocialLinks
          userId={userData.id}
          facebook={userData.facebook}
          instagram={userData.instagram}
          canEdit={canEdit}
        />
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
