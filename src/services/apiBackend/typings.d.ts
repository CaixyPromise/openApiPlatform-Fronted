declare namespace API {
  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCaptchaVO = {
    code?: number;
    data?: CaptchaVO;
    message?: string;
  };

  type BaseResponseGetVoucherVO = {
    code?: number;
    data?: GetVoucherVO;
    message?: string;
  };

  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type BaseResponseListInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo[];
    message?: string;
  };

  type BaseResponseListInterfaceInvokeCountVO = {
    code?: number;
    data?: InterfaceInvokeCountVO[];
    message?: string;
  };

  type BaseResponseListPost = {
    code?: number;
    data?: Post[];
    message?: string;
  };

  type BaseResponseListProductInfo = {
    code?: number;
    data?: ProductInfo[];
    message?: string;
  };

  type BaseResponseListUserVO = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseobject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseOrderVo = {
    code?: number;
    data?: OrderVo;
    message?: string;
  };

  type BaseResponsePageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    message?: string;
  };

  type BaseResponsePagePost = {
    code?: number;
    data?: PagePost;
    message?: string;
  };

  type BaseResponsePageProductInfo = {
    code?: number;
    data?: PageProductInfo;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponsePost = {
    code?: number;
    data?: Post;
    message?: string;
  };

  type BaseResponseProductInfo = {
    code?: number;
    data?: ProductInfo;
    message?: string;
  };

  type BaseResponseProductOrderVo = {
    code?: number;
    data?: ProductOrderVo;
    message?: string;
  };

  type BaseResponseSignatureVO = {
    code?: number;
    data?: SignatureVO;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUpdateKeyVO = {
    code?: number;
    data?: UpdateKeyVO;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type CaptchaVO = {
    codeImage?: string;
    uuid?: string;
  };

  type closedProductOrderUsingPOSTParams = {
    /** orderNo */
    orderNo?: string;
  };

  type deleteProductOrderUsingPOSTParams = {
    /** id */
    id?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getPostByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getProductInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getProductOrderByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type GetVoucherVO = {
    accessKey?: string;
    secretKey?: string;
  };

  type HeaderParam = {
    description?: string;
    fieldName?: string;
    headerValue?: string;
    required?: string;
  };

  type IdRequest = {
    id?: string;
  };

  type InterfaceInfo = {
    createTime?: string;
    description?: string;
    id?: string;
    isDelete?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestPayload?: string;
    responseHeader?: string;
    responsePayload?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: string;
  };

  type InterfaceInfoAddRequest = {
    description?: string;
    method?: string;
    name?: string;
    requestHeader?: HeaderParam[];
    requestPayload?: PayloadParam[];
    responseHeader?: HeaderParam[];
    responsePayload?: PayloadParam[];
    url?: string;
  };

  type InterfaceInfoInvokeRequest = {
    id?: string;
    userRequestPayload?: string;
  };

  type InterfaceInfoOffLineRequest = {
    id?: string;
  };

  type InterfaceInfoOnLineRequest = {
    id?: string;
  };

  type InterfaceInfoUpdateRequest = {
    description?: string;
    id?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestPayload?: string;
    responseHeader?: string;
    responsePayload?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInvokeCountVO = {
    createTime?: string;
    description?: string;
    failNum?: number;
    id?: string;
    isDelete?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestPayload?: string;
    responseHeader?: string;
    responsePayload?: string;
    status?: number;
    successNum?: number;
    totalNum?: number;
    updateTime?: string;
    url?: string;
    userId?: string;
  };

  type listInterfaceInfoByPageUsingGETParams = {
    current?: string;
    description?: string;
    id?: string;
    method?: string;
    name?: string;
    pageSize?: string;
    requestHeader?: string;
    requestPayload?: string;
    responseHeader?: string;
    responsePayload?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: string;
  };

  type listInterfaceInfoUsingGETParams = {
    current?: string;
    description?: string;
    id?: string;
    method?: string;
    name?: string;
    pageSize?: string;
    requestHeader?: string;
    requestPayload?: string;
    responseHeader?: string;
    responsePayload?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: string;
  };

  type listPostByPageUsingGETParams = {
    age?: number;
    contact?: string;
    content?: string;
    current?: string;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    pageSize?: string;
    place?: string;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listPostUsingGETParams = {
    age?: number;
    contact?: string;
    content?: string;
    current?: string;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    pageSize?: string;
    place?: string;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listProductInfoByPageUsingGETParams = {
    addPoints?: number;
    current?: string;
    description?: string;
    name?: string;
    pageSize?: string;
    productType?: string;
    sortField?: string;
    sortOrder?: string;
    total?: number;
  };

  type listProductInfoBySearchTextPageUsingGETParams = {
    current?: string;
    pageSize?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type listProductInfoUsingGETParams = {
    addPoints?: number;
    current?: string;
    description?: string;
    name?: string;
    pageSize?: string;
    productType?: string;
    sortField?: string;
    sortOrder?: string;
    total?: number;
  };

  type listProductOrderByPageUsingGETParams = {
    addPoints?: number;
    current?: string;
    orderName?: string;
    orderNo?: string;
    pageSize?: string;
    payType?: string;
    productInfo?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    total?: number;
  };

  type listUserByPageUsingGETParams = {
    createTime?: string;
    current?: string;
    gender?: number;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type listUserUsingGETParams = {
    createTime?: string;
    current?: string;
    gender?: number;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'ACCEPTED'
      | 'ALREADY_REPORTED'
      | 'BAD_GATEWAY'
      | 'BAD_REQUEST'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'CHECKPOINT'
      | 'CONFLICT'
      | 'CONTINUE'
      | 'CREATED'
      | 'DESTINATION_LOCKED'
      | 'EXPECTATION_FAILED'
      | 'FAILED_DEPENDENCY'
      | 'FORBIDDEN'
      | 'FOUND'
      | 'GATEWAY_TIMEOUT'
      | 'GONE'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'IM_USED'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'INSUFFICIENT_STORAGE'
      | 'INTERNAL_SERVER_ERROR'
      | 'I_AM_A_TEAPOT'
      | 'LENGTH_REQUIRED'
      | 'LOCKED'
      | 'LOOP_DETECTED'
      | 'METHOD_FAILURE'
      | 'METHOD_NOT_ALLOWED'
      | 'MOVED_PERMANENTLY'
      | 'MOVED_TEMPORARILY'
      | 'MULTIPLE_CHOICES'
      | 'MULTI_STATUS'
      | 'NETWORK_AUTHENTICATION_REQUIRED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NOT_ACCEPTABLE'
      | 'NOT_EXTENDED'
      | 'NOT_FOUND'
      | 'NOT_IMPLEMENTED'
      | 'NOT_MODIFIED'
      | 'NO_CONTENT'
      | 'OK'
      | 'PARTIAL_CONTENT'
      | 'PAYLOAD_TOO_LARGE'
      | 'PAYMENT_REQUIRED'
      | 'PERMANENT_REDIRECT'
      | 'PRECONDITION_FAILED'
      | 'PRECONDITION_REQUIRED'
      | 'PROCESSING'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'REQUEST_TIMEOUT'
      | 'REQUEST_URI_TOO_LONG'
      | 'RESET_CONTENT'
      | 'SEE_OTHER'
      | 'SERVICE_UNAVAILABLE'
      | 'SWITCHING_PROTOCOLS'
      | 'TEMPORARY_REDIRECT'
      | 'TOO_EARLY'
      | 'TOO_MANY_REQUESTS'
      | 'UNAUTHORIZED'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'UNPROCESSABLE_ENTITY'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'UPGRADE_REQUIRED'
      | 'URI_TOO_LONG'
      | 'USE_PROXY'
      | 'VARIANT_ALSO_NEGOTIATES';
    view?: View;
    viewName?: string;
  };

  type ModifyEmailCaptchaRequest = {
    code?: string;
    eventType: number;
    newEmail?: string;
    signature?: string;
  };

  type ModifyPasswordRequest = {
    confirmPassword: string;
    emailCode: string;
    newPassword: string;
    oldPassword: string;
    signature: string;
  };

  type ModifyUserEmailRequest = {
    code: string;
    email: string;
    signature: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type OrderVo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    optimizeJoinOfCountSql?: boolean;
    orders?: OrderItem[];
    records?: ProductOrderVo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageInterfaceInfo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PagePost = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Post[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageProductInfo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: ProductInfo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PayCreateRequest = {
    payType?: string;
    productId?: string;
  };

  type PayloadParam = {
    desc?: string;
    fieldName?: string;
    required?: string;
    type?: string;
  };

  type Post = {
    age?: number;
    contact?: string;
    content?: string;
    createTime?: string;
    education?: string;
    gender?: number;
    id?: string;
    isDelete?: number;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
    reviewMessage?: string;
    reviewStatus?: number;
    thumbNum?: number;
    updateTime?: string;
    userId?: string;
    viewNum?: number;
  };

  type PostAddRequest = {
    age?: number;
    contact?: string;
    content?: string;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
  };

  type PostUpdateRequest = {
    age?: number;
    contact?: string;
    content?: string;
    education?: string;
    gender?: number;
    id?: string;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
    reviewMessage?: string;
    reviewStatus?: number;
  };

  type ProductInfo = {
    addPoints?: string;
    createTime?: string;
    description?: string;
    expirationTime?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    productType?: string;
    status?: number;
    total?: string;
    updateTime?: string;
    userId?: string;
  };

  type ProductInfoAddRequest = {
    addPoints?: number;
    description?: string;
    expirationTime?: string;
    name?: string;
    productType?: string;
    total?: number;
  };

  type ProductInfoUpdateRequest = {
    addPoints?: number;
    description?: string;
    expirationTime?: string;
    id?: string;
    name?: string;
    productType?: string;
    total?: number;
  };

  type ProductOrderQueryRequest = {
    addPoints?: number;
    current?: string;
    orderName?: string;
    orderNo?: string;
    pageSize?: string;
    payType?: string;
    productInfo?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    total?: number;
  };

  type ProductOrderVo = {
    addPoints?: number;
    codeUrl?: string;
    createTime?: string;
    description?: string;
    expirationTime?: string;
    formData?: string;
    id?: string;
    orderName?: string;
    orderNo?: string;
    payType?: string;
    productId?: string;
    productInfo?: ProductInfo;
    productType?: string;
    status?: string;
    total?: string;
  };

  type SignatureVO = {
    signature?: string;
  };

  type UpdateKeyVO = {
    accessKey?: string;
    secretKey?: string;
  };

  type UserAddRequest = {
    gender?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserGetLicenseRequest = {
    nonce: string;
    password: string;
    timestamp: string;
  };

  type UserLoginRequest = {
    captcha?: string;
    captchaId?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    captcha?: string;
    captchaId?: string;
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    accessKey?: string;
    gender?: number;
    id?: string;
    secretKey?: string;
    token?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserVO = {
    balance?: string;
    email?: string;
    gender?: number;
    id?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type View = {
    contentType?: string;
  };
}
