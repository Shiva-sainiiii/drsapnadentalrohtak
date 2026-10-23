export default function Icon({ n, c = '' }) {
  return <svg className={'i ' + c} aria-hidden="true"><use href={'#' + n} /></svg>;
}
