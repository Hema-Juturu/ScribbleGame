import { PiRabbitThin } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { SiFoodpanda } from "react-icons/si";
import { LiaHelicopterSolid } from "react-icons/lia";
import { IoAlarmOutline } from "react-icons/io5";
import { GiPaintBrush } from "react-icons/gi";
import PropTypes from "prop-types";
import "/src/icons.css";

const getRandomIcon = (position) => {
  const rowSize = 8,
    boxSize = 250;
  const icons = [
    { element: CiStar, className: "star" },
    { element: PiRabbitThin, className: "rabbit" },
    { element: SiFoodpanda, className: "panda" },
    { element: LiaHelicopterSolid, className: "helicop" },
    { element: IoAlarmOutline, className: "rabbit" },
    { element: GiPaintBrush, className: "rabbit" },
  ];
  let index = Math.floor(Math.random() * 1331) % icons.length;
  const border = 50;
  const leftOffset = Math.floor(position % rowSize) * boxSize + border;
  const topOffset = Math.floor(position / rowSize) * boxSize + border;
  const styles = {
    position: "absolute",
    top: topOffset + Math.floor(Math.random() * (boxSize - 2 * border)),
    left: leftOffset + Math.floor(Math.random() * (boxSize - 2 * border)),
  };
  const Element = icons[index].element;
  const className = icons[index].className;
  return <Element style={styles} className={className} />;
};

const icons = Array(50).fill(0).map((_, index) => getRandomIcon(index))

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {icons}
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
