// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import email from '@src/views/apps/email/store'
import kanban from '@src/views/apps/kanban/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'
//API REDUCER USED FOR Forplayr
import userList from '@src/views/userList/store'
import clubList from '@src/views/clubList/store'
import editorialList  from '@src/views/allEditorialReport/store'
import reportList from '@src/views/reportUserList/store'
import reportClubList from '@src/views/reportClubList/store'
import reportEditorialList from '@src/views/reportEditorialList/store'
import reportPostList from '@src/views/reportPostList/store'
import notificationList from '@src/views/notificationList/store'
import companyBannerList from '@src/views/allCompanyBanner/store'

const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  kanban,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
  //API REDUCER USED FOR Forplayr
  userList,
  clubList,
  editorialList,
  reportList,
  reportClubList,
  reportEditorialList,
  reportPostList,
  notificationList,
  companyBannerList,
}

export default rootReducer
