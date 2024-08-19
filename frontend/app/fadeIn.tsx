const fadeIn = (direction: 'up' | 'down' | 'left' | 'right') => {
    return {
      hidden: {
        y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
        x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
        opacity: 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 0.75,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };
  
  export default fadeIn;