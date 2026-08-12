type VersionSwitchProps = {
  classicHref: string;
};

export default function VersionSwitch({ classicHref }: VersionSwitchProps) {
  return (
    <nav className="v2-version-switch" aria-label="Portfolio version">
      <span>View</span>
      <strong aria-current="page">Modern</strong>
      <a href={classicHref}>Classic</a>
    </nav>
  );
}
