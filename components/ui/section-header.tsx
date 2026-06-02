type SectionHeaderProps = {
  title: string;
  description?: string;
  descriptionClassName?: string;
};

export function SectionHeader({ title, description, descriptionClassName }: SectionHeaderProps) {
  return (
    <div className="mb-7 space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-sm text-black dark:text-zinc-300 sm:text-base ${descriptionClassName ?? ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
