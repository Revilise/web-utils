type bemOptions = {
  baseClass: string,
  extraClasses?: Record<string, boolean>,
  utilClasses?: string | Array<string | boolean>
}

export function useBEM(baseClass: string) {
  return {
    bem(options: bemOptions) {
      const { baseClass: blockCN, extraClasses: extraCN = {}, utilClasses: utilCN = [] } = options;
      const className = [];
      let base = !blockCN ? baseClass : `${baseClass}__${blockCN}`;
      
      className.push(base);
      
      if (Object.keys(extraCN).length > 0) {
        for (const key in extraCN) {
          if (extraCN[key]) {
            className.push(`${base}--${key}`);
          }
        }
      }
      
      if (typeof utilCN === "string") {
        className.push(utilCN);
      } else if (Array.isArray(utilCN)) {
        for (const i in utilCN) {
          const cn = utilCN[i];
          cn && className.push(cn);
        }
      }

      return className.join(" ");
    }
  }
}
