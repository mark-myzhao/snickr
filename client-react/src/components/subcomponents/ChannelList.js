import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ChatIcon from '@material-ui/icons/Chat'


class ChannelList extends React.Component {
  render() {
    const { type, list, handleClick } = this.props
    return (
      <div>
       <List>
          <ListSubheader inset>{type}</ListSubheader>
          {list.map(item => {
            return (
              <ListItem
                button
                key={`${item.wid}-${item.cname}`}
                onClick={() => {handleClick(item)}}
              >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={item.cname} />
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

export default ChannelList
