import React, { Component } from 'react'
import { connect } from 'react-redux'

export class UserHeader extends Component {
  render() {
    const { user } = this.props

    if (!user) {
      return <div>user not found</div>
    }

    return <div className="header">{this.props.user.id}</div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find((user) => user.id === ownProps.userId) }
}

export default connect(mapStateToProps)(UserHeader)
