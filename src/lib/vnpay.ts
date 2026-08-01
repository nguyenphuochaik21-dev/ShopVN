import crypto from 'crypto'

const VNP_URL = process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
const VNP_TMN_CODE = process.env.VNPAY_TMN_CODE || ''
const VNP_HASH_SECRET = process.env.VNPAY_HASH_SECRET || ''
const VNP_RETURN_URL = process.env.VNPAY_RETURN_URL || ''

interface VNPayParams {
  amount: number
  bankCode?: string
  orderDescription: string
  orderType: string
  language?: string
  orderId: string
}

export function createVNPayUrl(params: VNPayParams): string {
  const date = new Date()
  const createDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + '00'

  const vnp_Params: Record<string, string | number> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: VNP_TMN_CODE,
    vnp_Locale: params.language || 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: params.orderId,
    vnp_OrderInfo: params.orderDescription,
    vnp_OrderType: params.orderType,
    vnp_Amount: Math.round(params.amount * 100), // VNPay uses amount * 100
    vnp_ReturnUrl: VNP_RETURN_URL,
    vnp_IpAddr: '127.0.0.1',
    vnp_CreateDate: createDate,
  }

  if (params.bankCode) {
    vnp_Params['vnp_BankCode'] = params.bankCode
  }

  // Sort and create hash
  const sortedKeys = Object.keys(vnp_Params).sort()
  const signData = sortedKeys
    .map((key) => `${key}=${vnp_Params[key]}`)
    .join('&')

  const hmac = crypto.createHmac('sha512', VNP_HASH_SECRET)
  const vnp_SecureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

  const paymentUrl = new URL(VNP_URL)
  Object.entries(vnp_Params).forEach(([key, value]) => {
    paymentUrl.searchParams.set(key, String(value))
  })
  paymentUrl.searchParams.set('vnp_SecureHash', vnp_SecureHash)

  return paymentUrl.toString()
}

export function verifyVNPayReturn(query: Record<string, string>): boolean {
  const { vnp_SecureHash, ...vnp_Params } = query

  const sortedKeys = Object.keys(vnp_Params)
    .filter((key) => key.startsWith('vnp_'))
    .sort()

  const signData = sortedKeys
    .map((key) => `${key}=${vnp_Params[key]}`)
    .join('&')

  const hmac = crypto.createHmac('sha512', VNP_HASH_SECRET)
  const vnp_SecureHashType = 'SHA512'
  const calculatedHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

  return calculatedHash === vnp_SecureHash
}
