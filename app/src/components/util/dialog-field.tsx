import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const DialogField = ({
  title,
  id,
  value,
  textArea,
  type,
  placeholder,
  setField,
}: {
  title?: string;
  id: string;
  value: string;
  textArea: boolean;
  type?: string;
  placeholder?: string;
  setField: (field: string) => void;
}) => {
  const inputProperties = {
    id,
    value,
    placeholder,
    className: "col-span-3",
    type: type,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setField(e.target.value);
    },
  };

  return (
    <div className="grid items-center grid-cols-4 gap-4">
      {title && (
        <Label htmlFor={id} className="text-right">
          {title}
        </Label>
      )}
      {textArea ? (
        <Textarea {...inputProperties} />
      ) : (
        <Input {...inputProperties} />
      )}
    </div>
  );
};

export default DialogField;
