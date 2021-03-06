import React from 'react';
import { connect } from 'react-redux';

const RepoList = ({ repos }) => (
    <table className="mintable">
        <thead>
            <tr>
                <th>Repository</th>
                <th className="text-right">Stars</th>
                <th className="text-right">Forks</th>
            </tr>
        </thead>
        <tbody>
            { repos.map(repo => (
                <tr key={repo.name}>
                    <td>{repo.name}</td>
                    <td className="text-right">{repo.stargazers_count}</td>
                    <td className="text-right">{repo.forks_count}</td>
                </tr>
            ))}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan="3"><em>{repos.length} repositories retrieved</em></td>
            </tr>
        </tfoot>
    </table>
);

RepoList.propTypes = {
    repos: React.PropTypes.array,
};

const mapStateToProps = (state) => {
    const github = state.github;
    return {
        repos: github.repos,
    };
};

export default connect(
    mapStateToProps
)(RepoList);

