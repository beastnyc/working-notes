#!/usr/bin/env python3
"""
Simple HTTP server for Working Notes
Run this script to serve the files locally for testing
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Get the directory where this script is located
script_dir = Path(__file__).parent.absolute()
os.chdir(script_dir)

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Working Notes server running on http://localhost:{PORT}")
        print(f"📝 Main site: http://localhost:{PORT}/index.html")
        print(f"⚙️  Admin interface: http://localhost:{PORT}/admin.html")
        print("\nPress Ctrl+C to stop the server")
        
        # Open the admin interface in the default browser
        webbrowser.open(f'http://localhost:{PORT}/admin.html')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")

if __name__ == "__main__":
    main() 