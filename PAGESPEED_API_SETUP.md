# Google PageSpeed Insights API Setup Guide

## 🚀 **Real PageSpeed Data Integration**

Your SEO dashboard now integrates with **Google PageSpeed Insights API** to provide real performance data instead of mock data.

## 📋 **Setup Requirements**

### 1. **Get Your Google PageSpeed API Key**
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing one
- Enable the **PageSpeed Insights API**
- Go to "Credentials" → "Create Credentials" → "API Key"
- Copy your API key

### 2. **Environment Configuration**
Add this to your `.env.local` file:

```bash
# Google PageSpeed Insights API
GOOGLE_PAGESPEED_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_GOOGLE_PAGESPEED_API_KEY=your_actual_api_key_here
```

**⚠️ Important:** Replace `your_actual_api_key_here` with your real Google API key.

### 3. **Restart Development Server**
After adding the environment variable:

```bash
npm run dev
```

## 🔧 **How It Works**

### **Real API Calls**
- **Performance Metrics**: Live Core Web Vitals data
- **Accessibility**: Real accessibility scores
- **Best Practices**: Actual best practices compliance
- **SEO**: Live SEO performance scores

### **Data Sources**
- **Google PageSpeed Insights**: Official Google API
- **Real-time**: Live performance data
- **Mobile & Desktop**: Both device types analysed
- **Core Web Vitals**: FCP, LCP, FID, CLS metrics

### **Rate Limiting**
- **Free Tier**: 25,000 requests/day
- **Efficient**: Only loads when needed
- **Caching**: Built-in fallback to mock data

## 📊 **What You Get**

### **Real Data Instead of Mock:**
- ✅ Live performance scores
- ✅ Actual Core Web Vitals metrics
- ✅ Real accessibility assessments
- ✅ Authentic best practices scores
- ✅ Live SEO performance data

### **Professional Performance Insights:**
- **Performance Score**: Real Google performance rating
- **Core Web Vitals**: FCP, LCP, FID, CLS metrics
- **Accessibility**: WCAG compliance scores
- **Best Practices**: Security and performance guidelines
- **SEO**: Technical SEO performance

## 🛠 **API Endpoints Used**

### **Main PageSpeed API**
```
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed
```

### **Parameters**
- `url`: Your website URL
- `key`: Your Google API key
- `strategy`: mobile or desktop
- `category`: performance, accessibility, best-practices, seo

## 🔍 **Supported Features**

### **Performance Metrics**
- Overall performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### **Audit Categories**
- Performance optimisation
- Accessibility compliance
- Best practices adherence
- SEO technical performance

## 📈 **Performance & Limits**

### **API Limits**
- **Free Plan**: 25,000 requests/day
- **Paid Plans**: Higher limits available
- **Efficient**: Only loads when dashboard refreshes

### **Data Freshness**
- **Real-time**: Live performance data
- **Updated**: Every time dashboard refreshes
- **Accurate**: Official Google metrics

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"No Google PageSpeed API key found"**
   - Check your `.env.local` file
   - Ensure the key is correct
   - Restart your development server

2. **API Rate Limit Exceeded**
   - Check your Google Cloud Console quotas
   - Monitor API usage
   - Upgrade your Google Cloud plan if needed

3. **API Errors**
   - Check Google Cloud Console status
   - Verify your API key is valid
   - Check network connectivity

### **Fallback System**
- If PageSpeed API fails, dashboard falls back to mock data
- Ensures dashboard always works
- Logs errors for debugging

## 💰 **Cost Considerations**

### **Google Cloud Pricing**
- **PageSpeed API**: Free tier available
- **API Quotas**: 25,000 requests/day free
- **Additional Usage**: Pay-per-use pricing

### **Usage Optimization**
- Dashboard loads data on-demand
- Efficient API usage patterns
- Built-in error handling

## 🔄 **Next Steps**

1. **Add Your API Key**: Update `.env.local` with your key
2. **Test Integration**: Visit the SEO dashboard
3. **Monitor Usage**: Check Google Cloud Console for usage stats
4. **Optimize**: Review performance recommendations

## 📚 **Additional Resources**

- [Google PageSpeed Insights API Docs](https://developers.google.com/speed/docs/insights/v5/get-started)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Core Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**🎉 Congratulations!** Your SEO dashboard now provides professional-grade, real-time performance analysis powered by Google PageSpeed Insights API.
