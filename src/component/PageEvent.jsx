import React from "react";
import "./PageEvent.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/request.jsx";
import { getApiURL } from "../utils/env.jsx";
import Loading from "./box/Loading.jsx";
import Chip from "./form/Chip.jsx";
import { getContentFromBlock } from "../utils/article.jsx";
import { dateToString } from "../utils/date.jsx";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageEvent extends React.Component {
	constructor(props) {
		super(props);

		this.getArticleContent = this.getArticleContent.bind(this);

		this.state = {
			article: null,
			articleLoading: false,
		};
	}

	componentDidMount() {
		this.getArticleContent();
	}

	getArticleContent() {
		this.setState({
			article: null,
			articleLoading: false,
		});

		getRequest.call(this, "public/get_article_content/" + this.props.match.params.handle, (data) => {
			this.setState({
				article: data,
				articleLoading: false,
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		let positionToTreat = 0;

		return (
			<div className={"PageEvent page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/events">Events</Link></Breadcrumb.Item>
							{this.state.article !== null && !this.state.loading
								? <Breadcrumb.Item><Link to={"/calendar/" + this.props.match.params.handle}>{this.state.article.title}</Link></Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article !== null && this.state.article.content !== undefined
					&& !this.state.articleLoading
					? <div className="row row-spaced">
						<div className="col-md-12">
							<article>
								<div className='PageEvent-content-cover'>
									{this.state.article.image !== null
										? <img src={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
										: ""}
									<div className='PageEvent-publication-date'>
										{dateToString(this.state.article.start_date, "DD MMM YYYY HH:mm")}
										<br/>
										{dateToString(this.state.article.end_date, "DD MMM YYYY HH:mm")}
									</div>
								</div>

								<div className="PageArticle-tags">
									{this.state.article.taxonomy_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											url={"/search?taxonomy_value=" + t.id}
										/>
									))}
								</div>

								<div className="PageArticle-companies">
									{this.state.article.company_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											color={"#ffa8b0"}
											url={"/company/" + t.id}
										/>
									))}
								</div>

								<h1 className="showFulltext">
									{this.state.article.title}
								</h1>

								{this.state.article.abstract !== null
									&& <div
										className="PageArticle-abstract"
										dangerouslySetInnerHTML={{
											__html:
											dompurify.sanitize(this.state.article.abstract),
										}}>
									</div>
								}

								{this.state.article.content.map((b, i) => {
									if (positionToTreat <= i) {
										positionToTreat += 1;
										return getContentFromBlock(b);
									}
									return null;
								})}

								<div className="PageArticle-tags">
									{this.state.article.taxonomy_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											url={"/search?taxonomy_value=" + t.id}
										/>
									))}
								</div>

								<div className="PageArticle-companies">
									{this.state.article.company_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											color={"#ffa8b0"}
											url={"/company/" + t.id}
										/>
									))}
								</div>
							</article>
						</div>
					</div>
					: <Loading
						height={400}
					/>
				}
			</div>
		);
	}
}
