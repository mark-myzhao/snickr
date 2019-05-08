import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import PublicIcon from '@material-ui/icons/Public'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import ForumIcon from '@material-ui/icons/Forum'


class ChannelList extends React.Component {
  getChatIcon = (type) => {
    if (type.toLowerCase() === 'public') {
      return <PublicIcon />
    } else if (type.toLowerCase() === 'private') {
      return <ChatBubbleIcon />
    } else {
      return <ForumIcon />
    }
  }

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
                  {this.getChatIcon(type)}
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
