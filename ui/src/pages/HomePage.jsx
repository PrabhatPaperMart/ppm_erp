import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Card,
  Flex,
  Avatar
} from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const actions = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  const googleSheets = _.times(10, (index) => {
    return {
      id: index,
      name: `Sheet ${index + 1}`,
    };
  });

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Flex wrap justify="space-between">
      {
        _.map(googleSheets, sheet => {
          return (
            <Card
              loading={ loading }
              actions={ actions }
              key={ sheet.id }
              style={ { width: 300, margin: 10 } }
            >
              <Card.Meta
                avatar={ <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" /> }
                title={ sheet.name }
                description={
                  <>
                    <p>This is the description</p>
                    <p>This is the description</p>
                  </>
                }
              />
            </Card>
          );
        })
      }
    </Flex>
  )
};

export default HomePage;