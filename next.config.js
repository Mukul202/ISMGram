/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental:{
    runtime: 'nodejs',
    images:{
      layoutRaw:true
    }
  }
}
