// TODO: move these to constants
export const cardWidth = 264; //px
export const spacing = 24; //px
export const lg = 4;
export const md = 3;
export const sm = 2;
export const xs = 1;

export const breakpoints = {
  lg: {
    max: 3000,
    min: cardWidth * lg + spacing * (lg - 1),
  },
  md: {
    max: cardWidth * lg + spacing * (lg - 1),
    min: cardWidth * md + spacing * md,
  },
  sm: {
    max: cardWidth * md + spacing * md,
    min: cardWidth * sm + spacing * (sm + 1),
  },
  xs: {
    max: cardWidth * sm + spacing * (sm + 1),
    min: 0,
  },
};

export const responsive = {
  lg: {
    breakpoint: {
      max: breakpoints.lg.max,
      min: breakpoints.lg.min,
    },
    items: lg,
    slidesToSlide: lg,
    partialVisibilityGutter: 30,
  },
  md: {
    breakpoint: {
      max: breakpoints.md.max,
      min: breakpoints.md.min,
    },
    items: md,
    slidesToSlide: md,
    partialVisibilityGutter: 30,
  },
  sm: {
    breakpoint: {
      max: breakpoints.sm.max,
      min: breakpoints.sm.min,
    },
    items: sm,
    slidesToSlide: sm,
    partialVisibilityGutter: 30,
  },
  xs: {
    breakpoint: {
      max: breakpoints.xs.max,
      min: breakpoints.xs.min,
    },
    items: xs,
    slidesToSlide: xs,
    partialVisibilityGutter: 30,
  },
};
