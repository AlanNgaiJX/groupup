import classnames from 'classnames'
import './test-com.scss';

function testCom(props){
    return <div className={classnames(['a', 'b'])}>???</div>
}

export default testCom;