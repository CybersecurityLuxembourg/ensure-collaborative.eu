import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { getCommunityAppURL } from "../../utils/env.jsx";
import { getSettingValue } from "../../utils/setting.jsx";

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="Footer">
				<div className="Footer-content">
					<div className="row">
						<div className="col-md-4">
							<div className="Footer-title">MENU</div>

							<div className="row">
								<div className="col-md-6">
									<div>
										<Link to="/">Home</Link>
									</div>
									<br/>
									<div>
										<Link to="/members">Members</Link>
									</div>
									<div>
										<Link to="/news">News</Link>
									</div>
									<div>
										<Link to="/events">Events</Link>
									</div>
									<br/>
									<div>
										<Link to="/about">About</Link>
									</div>
									<div>
										<a href={getCommunityAppURL()}>
											{getSettingValue(this.props.settings, "ADMIN_PLATFORM_NAME")
												? getSettingValue(this.props.settings, "ADMIN_PLATFORM_NAME")
												: "Community"
											}
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-6 Footer-contact">
							<div className="Footer-title">CONTACT</div>
							<br/>
							<div>contact@ensure-collaborative.eu</div>
						</div>

						<div className="col-md-2">
							<div className="Footer-network">
								{/* <a
									href="https://twitter.com/"
									rel="noreferrer"
									target="_blank"
									title="Twitter"
									className="text-capitalize">
									<i className="fab fa-twitter Footer-network"/>
								</a>
								<a
									href="https://www.linkedin.com/company"
									rel="noreferrer"
									target="_blank"
									title="LinkedIn"
									className="text-capitalize">
									<i className="fab fa-linkedin-in Footer-network"/>
								</a> */}
							</div>
							<div className="Footer-brand">© 2022 EnSure Collaborative</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
