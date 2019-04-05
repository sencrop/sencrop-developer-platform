
import { color } from '../ui'

const Anchor = ({ text, id }) => {
  const hash = id || text.toLowerCase().replace(/[^\d\w]/g, "_");

  return (
    <span>
      {text}{" "}
      <small aria-hidden="true"><a id={hash} href={`#${hash}`}>
        #
      </a></small>
      <style jsx>{`
        small { float: right; }
        small a { color: ${color('grey')}; }
        small a:target { font-size:120%; color: ${color('green')}; }
      `}</style>
    </span>
  );
};

export default Anchor;
