'use client';

import { updateUsersSocialLinks } from '@/actions/users';
import InfoBox from '@/components/InfoBox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Edit3Icon,
  Facebook,
  Instagram,
  LinkIcon,
  Loader2Icon,
  SaveIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  userId: string;
  facebook: string | null;
  instagram: string | null;
  canEdit?: boolean;
};

const SocialLinks = ({ userId, facebook, instagram, canEdit }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [fb, setFb] = useState(facebook || '');
  const [ig, setIg] = useState(instagram || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const response = await updateUsersSocialLinks(userId, fb, ig);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      setEditMode(false);
    } else {
      toast.error(response.message);
    }
  };

  if (canEdit && editMode) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Instagram />
          <Input
            type="text"
            placeholder="Upiši link..."
            value={ig}
            onChange={(e) => setIg(e.target.value)}
            className="rounded border px-2 py-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <Facebook />
          <Input
            type="text"
            placeholder="Upiši link..."
            value={fb}
            onChange={(e) => setFb(e.target.value)}
            className="rounded border px-2 py-1"
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setEditMode(false);
              setFb(facebook || '');
              setIg(instagram || '');
            }}
            size={'sm'}
          >
            Otkaži
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || (fb === facebook && ig === instagram)}
            size={'sm'}
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin" />
                Čuvanje...
              </>
            ) : (
              <>
                <SaveIcon />
                Sačuvaj
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-2">
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-2 rounded-md border border-pink-500 px-4 py-2 text-pink-500 transition-colors hover:bg-pink-500 hover:text-white"
          >
            <Instagram /> Instagram <LinkIcon className="ml-auto" />
          </a>
        )}

        {facebook && (
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
          >
            <Facebook /> Facebook <LinkIcon className="ml-auto" />
          </a>
        )}

        {!facebook && !instagram && (
          <InfoBox message="Nema linkova ka društvenim mrežama." />
        )}
      </div>

      {canEdit && (
        <Button onClick={() => setEditMode(true)} variant={'link'} size={'sm'}>
          <Edit3Icon />
          Izmeni linkove
        </Button>
      )}
    </div>
  );
};

export default SocialLinks;
