import { Button } from "@/shared/components/ui/Button";
import { FormValues } from "@/shared/hooks/useMediaDownloader";
import { BaseSyntheticEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SearchFormProps {
  errors: FieldErrors<FormValues>;
  isSubmitting: boolean;
  isDownloading?: boolean;
  placeholder?: string;
  register: UseFormRegister<FormValues>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
}
export const SearchForm = ({
  errors,
  isSubmitting,
  isDownloading,
  placeholder,
  onSubmit,
  register,
}: SearchFormProps) => {
  const isFormDisabled = isSubmitting || isDownloading;
  return (
    <>
      <form onSubmit={onSubmit} className="flex w-full gap-2 xl:gap-6">
        <input
          type="text"
          placeholder={placeholder}
          className={`border-line-light bg-base-primary focus:outline-action-primary w-full gap-6 rounded-md border p-4 focus:ring-0 focus:outline-2 ${
            isFormDisabled ? "cursor-not-allowed opacity-60" : ""
          }`}
          disabled={isFormDisabled}
          {...register("inputURL")}
        />
        <Button type="submit" className="bg-action-primary w-1/4 rounded-md p-2 text-white" disabled={isFormDisabled}>
          {isSubmitting ? "Memproses..." : "Mulai Sekarang"}
        </Button>
      </form>
      {errors.inputURL && <p className="text-lg text-red-500">{errors.inputURL.message}</p>}
    </>
  );
};
