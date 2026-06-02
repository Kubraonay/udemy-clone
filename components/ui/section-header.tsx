type SectionHeaderProps = {
  title: string;
  description?: string;
  descriptionClassName?: string;
};

export function SectionHeader({ title, description, descriptionClassName }: SectionHeaderProps) {
  return (
    <div className="mb-8 space-y-3">
      <h2 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-100 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-3xl text-base font-medium text-black dark:text-zinc-300 sm:text-lg ${descriptionClassName ?? ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
