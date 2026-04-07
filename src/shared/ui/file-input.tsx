import { FileUpload, Input } from "@chakra-ui/react";

interface FileInputProps {
  onChange?: (files: File[]) => void;
}

export default function FileInput({ onChange }: FileInputProps) {
  return (
    <FileUpload.Root
      gap="1"
      onFileChange={(details) => onChange?.(details.acceptedFiles || [])}
    >
      <FileUpload.HiddenInput />
      <Input asChild borderRadius="lg">
        <FileUpload.Trigger>
          <FileUpload.FileText />
        </FileUpload.Trigger>
      </Input>
    </FileUpload.Root>
  );
}
