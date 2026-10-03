import { Link, type LinkProps } from 'react-router-dom';
import { useLang } from './useLang';

/** Działa jak <Link>, ale sam dokleja /en na angielskiej wersji. */
export function LocalizedLink({ to, ...props }: LinkProps) {
  const { localePath } = useLang();
  return <Link to={typeof to === 'string' ? localePath(to) : to} {...props} />;
}
