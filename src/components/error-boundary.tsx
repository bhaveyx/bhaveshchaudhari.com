"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class BlogErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Blog Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <Card className="max-w-md w-full">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Something went wrong</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">
                  There was an error loading this blog post. This might be due to a formatting issue in the content.
                </p>
                {this.state.error && (
                  <details className="text-left bg-gray-50 p-3 rounded text-sm">
                    <summary className="cursor-pointer font-medium">Error details</summary>
                    <pre className="mt-2 text-xs overflow-auto">{this.state.error.message}</pre>
                  </details>
                )}
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                  <Button onClick={() => (window.location.href = "/blogs")}>Back to Blog</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )
    }

    return this.props.children
  }
}
