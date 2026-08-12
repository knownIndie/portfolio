import Link from "next/link";

type V1VersionSwitchProps = {
  canonicalPath: "/" | "/about" | "/projects" | "/resume";
};

export default function V1VersionSwitch({
  canonicalPath,
}: V1VersionSwitchProps) {
  return (
    <nav aria-label="Portfolio version" className="v1-version-switch">
      <Link href={canonicalPath} className="v1-version-link">
        Modern
      </Link>
      <span
        className="v1-version-link v1-version-link-current"
        aria-current="page"
      >
        Classic
      </span>
    </nav>
  );
}
