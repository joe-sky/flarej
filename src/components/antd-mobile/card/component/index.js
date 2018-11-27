import { registerComponent } from 'nornj';
import Card from 'antd-mobile/lib/card/index';

registerComponent({
  'antm-Card': Card,
  'antm-CardHeader': Card.Header,
  'antm-CardBody': Card.Body
});

export default Card;