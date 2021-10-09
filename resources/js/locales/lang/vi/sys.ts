export default {
  api: {
    operationFailed: 'Operation failed',
    errorTip: 'Error Tip',
    errorMessage: 'The operation failed, the system is abnormal!',
    timeoutMessage: 'Login timed out, please log in again!',
    apiTimeoutMessage: 'Yêu cầu bị trễ, hãy thử lại sau!',
    apiRequestFailed: 'Lỗi hệ thống! Xin hãy thử lại sau!',
    networkException: 'network anomaly',
    networkExceptionMsg:
      'Please check if your network connection is normal! The network is abnormal',

    errMsg401: 'The user does not have permission (token, user name, password error)!',
    errMsg403: 'The user is authorized, but access is forbidden!',
    errMsg404: 'Network request error, the resource was not found!',
    errMsg405: 'Network request error, request method not allowed!',
    errMsg408: 'Network request timed out!',
    errMsg500: 'Server error, please contact the administrator!',
    errMsg501: 'The network is not implemented!',
    errMsg502: 'Network Error!',
    errMsg503: 'The service is unavailable, the server is temporarily overloaded or maintained!',
    errMsg504: 'Network timeout!',
    errMsg505: 'The http version does not support the request!',
  },
  app: {
    logoutTip: 'Lời nhắc',
    logoutMessage: 'Xác nhận rời khỏi hệ thống?',
    menuLoading: 'Đăng tải menu...',
  },
  errorLog: {
    tableTitle: 'Error log list',
    tableColumnType: 'Type',
    tableColumnDate: 'Time',
    tableColumnFile: 'File',
    tableColumnMsg: 'Error message',
    tableColumnStackMsg: 'Stack info',

    tableActionDesc: 'Details',

    modalTitle: 'Error details',

    fireVueError: 'Fire vue error',
    fireResourceError: 'Fire resource error',
    fireAjaxError: 'Fire ajax error',

    enableMessage: 'Only effective when useErrorHandle=true in `/src/settings/projectSetting.ts`.',
  },
  exception: {
    backLogin: 'Quay lại trang đăng nhập',
    backHome: 'Trang chủ',
    subTitle403: 'Bạn không có quyền truy cập trang này!',
    subTitle404: 'Trang bạn truy cập không tồn tại.',
    subTitle500: 'Server phản hổi với lỗi. Hảy thử lại sau!',
    noDataTitle: 'Không có dữ liệu tại trang này!',
    networkErrorTitle: 'Lỗi mạng',
    networkErrorSubTitle: 'Kết nối internet của bạn đã bị ngắt. Hãy kết nối lại!',
  },
  lock: {
    unlock: 'Chạm để mở khoá',
    alert: 'Mật khẩu không đúng!',
    backToLogin: 'Quay lại trang đăng nhập',
    entry: 'Vào hệ thống',
    placeholder: 'Hãy nhập vào thông tin đăng nhập để mở khoá',
  },
  login: {
    backSignIn: 'Quay lại trang đăng nhập',
    mobileSignInFormTitle: 'Đăng nhập bằng SĐT',
    qrSignInFormTitle: 'Qr code sign in',
    signInFormTitle: 'Đăng nhập',
    signUpFormTitle: 'Đăng ký',
    forgetFormTitle: 'Lấy lại mật khẩu',
    signInTitle: 'Hệ thống quản lý kho - SAPO',
    signInDesc: 'Nhập thông tin của bạn và bắt đầu nào!',
    policy: 'I agree to the xxx Privacy Policy',
    scanSign: `scanning the code to complete the login`,

    loginButton: 'Đăng nhập',
    registerButton: 'Đăng ký',
    rememberMe: 'Ghi nhớ tôi',
    forgetPassword: 'Quên mật khẩu?',
    otherSignIn: 'Đăng nhập bằng',

    // notify
    loginSuccessTitle: 'Đăng nhập thành công',
    loginSuccessDesc: 'Chào mừng quay trở lại',

    // placeholder
    accountPlaceholder: 'Hãy điền tài khoản hoặc email',
    passwordPlaceholder: 'Háy nhập mật khẩu',
    smsPlaceholder: 'Hãy điền mã gửi về tin nhắn',
    mobilePlaceholder: 'Hãy điền số điện thoại',
    policyPlaceholder: 'Register after checking',
    diffPwd: 'Xác nhận mật khẩu sai',

    userName: 'Số điện thoại hoặc email',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    email: 'Email',
    smsCode: 'Mã SMS',
    mobile: 'Di động',
  },
};
