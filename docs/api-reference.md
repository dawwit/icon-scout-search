# IconScout REST API v3 Reference

## Overview

The IconScout REST API v3 provides access to over 8.5 million design assets including icons, illustrations, 3D assets, and Lottie animations. This API enables developers to integrate IconScout's vast library of design resources into their applications.

## Base URL

```
https://api.iconscout.com/v3
```

## Authentication

All API requests require authentication using Client ID and Client Secret headers:

```javascript
{
  "Client-ID": "{Client-ID}",
  "Client-Secret": "{Client-Secret}",
  "Content-Type": "application/json"
}
```

### Getting API Access

1. Sign up for an IconScout account
2. Navigate to API settings
3. Generate your Client ID and Client Secret
4. Free tier available for 15 days

## Rate Limits

- API usage is based on your subscription plan
- Monthly download limits apply
- Exceeding limits results in per-asset charges

## Endpoints

### Search Assets

Search through the IconScout library for various asset types.

#### `GET /search`

Search for assets with various filters and parameters.

**Parameters:**
- `asset` (string): Asset type filter
  - `icon` - Search for icons
  - `illustration` - Search for illustrations
  - `3d` - Search for 3D assets
  - `lottie` - Search for Lottie animations
- `query` (string): Search query (Note: uses 'query' not 'q')
- `category` (string): Category filter
- `style` (string): Style filter (line, flat, colored-outline, glyph, etc.)
- `price` (string): Price filter (`free`, `premium`, `all`)
- `format` (string): File format filter
- `page` (integer): Page number (default: 1)
- `per_page` (integer): Results per page (max: 100)
- `sort` (string): Sort order
  - `popular` - Most popular first
  - `latest` - Newest first
  - `featured` - Featured assets first
  - `relevant` - Most relevant to query

**Example Request:**
```javascript
var settings = {
  "url": "https://api.iconscout.com/v3/search?asset=icon&query=business&category=business&style=line&price=free&page=1&per_page=20",
  "method": "GET",
  "headers": {
    "Client-ID": "{Client-ID}"
  }
};

$.ajax(settings)
  .done(function(response) {
    console.log(response);
  });
```

**Response Structure:**
```json
{
  "response": {
    "items": {
      "current_page": 1,
      "data": [
        {
          "id": 474986,
          "uuid": "658e89ed-9d1b-11e8-aa5b-16f546a19484",
          "name": "Refresh",
          "slug": "refresh-470",
          "asset": "icon",
          "price": 2,
          "urls": {
            "png_64": "https://cdn.iconscout.com/icon/premium/png-64-thumb/refresh-470-474986.png",
            "png_128": "https://cdn.iconscout.com/icon/premium/png-128-thumb/refresh-470-474986.png",
            "png_256": "https://cdn.iconscout.com/icon/premium/png-256-thumb/refresh-470-474986.png",
            "svg": "https://cdn.iconscout.com/icon/premium/svg/refresh-470-474986.svg"
          },
          "color_codes": [
            {
              "color_id": 1,
              "decimal_color": 0
            }
          ],
          "category": {
            "id": "business",
            "name": "Business",
            "slug": "business"
          },
          "author": {
            "name": "Author Name",
            "url": "https://iconscout.com/contributors/..."
          },
          "created_at": "2024-01-15T10:30:00Z",
          "download_count": 1234
        }
      ],
      "total": 50000,
      "per_page": 20,
      "from": 1,
      "to": 20
    }
  },
  "meta": {
    "total_time": 0.15
  }
}
```

### Download Assets

Download specific assets from the IconScout library.

#### `POST /items/{item_uuid}/api-download`

Download a specific asset by its UUID.

**Parameters:**
- `item_uuid` (string, required): The unique identifier of the asset
- `format` (string, required): Download format
  - For Icons: `svg`, `png`, `ico`, `icns`, `pdf`, `eps`, `ai`
  - For Illustrations: `svg`, `png`, `pdf`, `eps`, `ai`
  - For 3D Assets: `png`, `blend`, `fbx`, `gltf`, `obj`
  - For Lottie: `json`, `gif`, `mp4`

**Example Request:**
```javascript
var settings = {
  "url": "https://api.iconscout.com/v3/items/{item_uuid}/api-download",
  "method": "POST",
  "headers": {
    "Client-ID": "{Client-ID}",
    "Client-Secret": "{Client-Secret}",
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({
    "format": "svg"
  })
};

$.ajax(settings)
  .done(function(response) {
    console.log(response);
  });
```

**Response Structure:**
```json
{
  "download_url": "https://cdn.iconscout.com/download/...",
  "expires_at": "2024-01-15T11:30:00Z",
  "format": "svg",
  "size": 2048,
  "download_id": "download_uuid"
}
```

### Asset Details

Get detailed information about a specific asset.

#### `GET /items/{item_uuid}`

Retrieve detailed information about a specific asset.

**Parameters:**
- `item_uuid` (string, required): The unique identifier of the asset

**Example Request:**
```javascript
var settings = {
  "url": "https://api.iconscout.com/v3/items/{item_uuid}",
  "method": "GET",
  "headers": {
    "Client-ID": "{Client-ID}"
  }
};
```

**Response Structure:**
```json
{
  "id": 474986,
  "uuid": "658e89ed-9d1b-11e8-aa5b-16f546a19484",
  "name": "Refresh",
  "slug": "refresh-470",
  "asset": "icon",
  "price": 2,
  "urls": {
    "png_64": "https://cdn.iconscout.com/icon/premium/png-64-thumb/refresh-470-474986.png",
    "png_128": "https://cdn.iconscout.com/icon/premium/png-128-thumb/refresh-470-474986.png",
    "png_256": "https://cdn.iconscout.com/icon/premium/png-256-thumb/refresh-470-474986.png",
    "svg": "https://cdn.iconscout.com/icon/premium/svg/refresh-470-474986.svg"
  },
  "color_codes": [
    {
      "color_id": 1,
      "decimal_color": 0
    }
  ],
  "category": {
    "id": "business",
    "name": "Business",
    "slug": "business"
  },
  "author": {
    "name": "Author Name",
    "url": "https://iconscout.com/contributors/...",
    "avatar": "https://cdn.iconscout.com/avatars/..."
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "download_count": 1234,
  "view_count": 5678,
  "like_count": 89
}
```

### Categories

Get available categories for filtering assets.

#### `GET /categories`

Retrieve list of all available categories.

**Parameters:**
- `asset_type` (string, optional): Filter categories by asset type

**Example Request:**
```javascript
var settings = {
  "url": "https://api.iconscout.com/v3/categories?asset_type=icon",
  "method": "GET",
  "headers": {
    "Client-ID": "{Client-ID}"
  }
};
```

### Trending Assets

Get currently trending assets.

#### `GET /trending`

Retrieve currently trending assets.

**Parameters:**
- `asset_type` (string): Type of assets to get trending for
- `time_period` (string): Time period (`daily`, `weekly`, `monthly`)
- `limit` (integer): Number of assets to return (max: 100)

### Popular Tags

Get popular tags for asset discovery.

#### `GET /tags/popular`

Retrieve popular tags across the platform.

**Parameters:**
- `asset_type` (string, optional): Filter tags by asset type
- `limit` (integer): Number of tags to return (max: 100)

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (asset doesn't exist)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

**Error Response Structure:**
```json
{
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "The provided parameters are invalid",
    "details": {
      "asset": "Invalid asset type provided"
    }
  }
}
```

## Asset Response Fields

### Core Asset Properties
- `id` (number): Unique asset ID
- `uuid` (string): Universally unique identifier
- `name` (string): Asset name/title
- `slug` (string): URL-friendly asset identifier
- `asset` (string): Asset type (icon, illustration, 3d, lottie)
- `price` (number): Asset price (0 for free assets)

### Image URLs
The `urls` object contains different image formats and sizes:
- `png_64`: 64x64 PNG thumbnail
- `png_128`: 128x128 PNG thumbnail
- `png_256`: 256x256 PNG thumbnail
- `png_512`: 512x512 PNG (if available)
- `svg`: SVG format (if available)

### Additional Properties
- `color_codes`: Array of color information
- `category`: Category details (id, name, slug)
- `author`: Author information (name, url)
- `created_at`: Creation timestamp
- `download_count`: Number of downloads

## Asset Types

### Icons
- **Formats**: SVG, PNG (multiple sizes), ICO, ICNS, PDF, EPS, AI
- **Styles**: Line, Flat, Colored Outline, Glyph, Dual Tone, Rounded, Gradient, Doodle, Isometric, Sticker
- **Sizes**: 64x64, 128x128, 256x256, 512x512

### Illustrations
- **Formats**: SVG, PNG, PDF, EPS, AI
- **Types**: Vector Illustrations, Business Illustrations
- **Customizable**: Colors and elements

### 3D Assets
- **Formats**: PNG, BLEND, FBX, glTF, OBJ
- **Types**: 3D Illustrations, 3D Icons, 3D Avatars
- **Editable**: With glTF 3D Editor

### Lottie Animations
- **Formats**: JSON, GIF, MP4
- **Types**: Animated Icons, Animated Stickers, Animated Illustrations
- **Customizable**: Colors and timing

## Pagination

The search response includes pagination information:
- `current_page`: Current page number
- `total`: Total number of assets
- `per_page`: Number of assets per page
- `from`: Starting asset number on current page
- `to`: Ending asset number on current page

Calculate total pages: `Math.ceil(total / per_page)`

## Usage Limits

### Free Tier
- 15-day free access
- Limited downloads per day
- Watermarked assets

### Paid Plans
- Monthly download quotas
- Unlimited access during subscription
- Premium assets included
- No watermarks
- Commercial license

## Best Practices

1. **Caching**: Cache search results and asset details to reduce API calls
2. **Error Handling**: Implement proper error handling for all API calls
3. **Rate Limiting**: Respect rate limits and implement backoff strategies
4. **Image Optimization**: Choose appropriate formats and sizes for your use case
5. **Attribution**: Follow attribution requirements where applicable
6. **Null Checking**: Always validate API response structure before processing

## Implementation Notes

### Response Structure Changes
- Search responses are wrapped in a `response` object
- Asset data is nested under `response.items.data`
- Pagination info is under `response.items`
- Use `query` parameter instead of `q` for search terms

### Asset Transformation
When processing assets, handle optional fields gracefully:
```javascript
const imageUrl = asset.urls.png_256 || 
                 asset.urls.png_128 || 
                 asset.urls.png_64 || 
                 asset.urls.svg || ''

const isPremium = asset.price > 0
```

## SDKs and Libraries

Official SDKs available for:
- JavaScript/Node.js
- PHP
- Python
- Ruby

## Support

- **Documentation**: [IconScout API Docs](https://iconscout.com/api)
- **Support Email**: support@iconscout.com
- **Community**: Discord community available

## Legal

- All assets are royalty-free
- Commercial use allowed under license
- Attribution may be required for free assets
- Review license terms for specific use cases 