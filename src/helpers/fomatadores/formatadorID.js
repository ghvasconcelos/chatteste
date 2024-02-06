export const formatId = (props) => {

  if (props?.includes(':') || props?.includes("g.us")) {  
      let firstPart = props.slice(0, props.indexOf(':'));
      let secondPart = props.split('@');
      let res = firstPart + '@' + secondPart[1];
  
      return res;

    } else {
   
      return props;
    }
};