import { Button, List, Card, Icon } from "antd";
import React, {memo} from 'react';
import propTypes from 'prop-types';

const FollowList = memo(({header, hasMore, onClickMore, onClickStop, data}) => {
    return(
        <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, sx: 2, md: 3 }}
        size="small"
        header={<div>{header}</div>}
        loadMore={hasMore && <Button style={{ width: "100%" }} onClick={onClickMore}>더 보기</Button>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card
              actions={[
                <Icon key="stop" type="stop" onClick={onClickStop(item.id)} />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    );
});

FollowList.propTypes = {
    header: propTypes.string.isRequired,
    hasMore: propTypes.bool.isRequired,
    onClickMore : propTypes.func.isRequired,
    data: propTypes.array.isRequired,
    onClickStop : propTypes.func.isRequired,
}
export default FollowList;