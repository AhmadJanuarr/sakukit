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
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:h-14 sm:w-full sm:flex-row sm:gap-2 xl:gap-6">
        <input
          type="text"
          placeholder={placeholder}
          className={`border-line-strong bg-base-secondary focus:outline-action-primary h-12 w-full gap-6 rounded-md border px-4 focus:ring-0 focus:outline-2 sm:h-auto sm:px-6 ${
            isFormDisabled ? "cursor-not-allowed opacity-60" : ""
          }`}
          disabled={isFormDisabled}
          {...register("inputURL")}
        />
        <Button
          variant="default"
          type="submit"
          className="h-12 w-full rounded-md sm:h-full sm:w-1/4"
          disabled={isFormDisabled}
        >
          {isSubmitting ? "Memproses..." : "Mulai Sekarang"}
        </Button>
      </form>
      {errors.inputURL && <p className="text-sm text-red-500 sm:text-lg">{errors.inputURL.message}</p>}
    </>
  );
};
