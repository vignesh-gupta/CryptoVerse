import { Card, Col, Row, Select, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
  });

  const count = simplified ? 6 : 9;

  if (!cryptoNews?.articles) return <Loader />;

  return (
    <>
      {!simplified && (
        <Select
          showSearch
          className="select-news"
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="crypto">All</Option>
          {data?.data?.coins?.map((currency) => (
            <Option key={currency.name} value={currency.name}>
              {currency.name}
            </Option>
          ))}
        </Select>
      )}
      <Row gutter={[24, 24]}>
        {!cryptoNews?.articles.length && <p className="no-news">No recent new on {newsCategory}</p>}
        {cryptoNews?.articles?.slice(0, count).map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <Card hoverable className="news-card">
                <div>
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.title}
                    </Title>
                    <img src={news?.image || demoImage} alt="" />
                  </div>
                  <p>
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                </div>
                <div className="provider-container">
                  <div>
                    <Text className="provider-name">{news.source?.name}</Text>
                  </div>
                  <Text>
                    {moment(news?.publishedAt).startOf("ss").fromNow()}
                  </Text>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
