type VersionSwitchProps = {
  classicHref: string;
};

export default function VersionSwitch({ classicHref }: VersionSwitchProps) {
  return (
    <nav className="v2-version-switch" aria-label="Portfolio version">
      <span aria-current="page">Modern</span>
      <a href={classicHref}>Classic</a>
    </nav>
  );
}
