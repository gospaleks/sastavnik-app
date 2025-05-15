type Props = {
  message: string;
};

const InfoBox = ({ message }: Props) => {
  return (
    <div className="border-accent flex w-full items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center">
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default InfoBox;
