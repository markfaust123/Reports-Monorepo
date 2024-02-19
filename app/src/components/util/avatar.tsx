import { getInitials } from "@/lib/utils";
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type AvatarProps = {
  name: string;
  avatarUrl?: string;
};

const Avatar = ({ name, avatarUrl }: AvatarProps) => {
  return (
    <UIAvatar>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
