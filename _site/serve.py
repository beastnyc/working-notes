#!/usr/bin/env python3
"""
Simple HTTP server for Working Notes
Serves the files and provides a file saving endpoint for the admin interface
"""

import http.server
import socketserver
import json
import os
from urllib.parse import urlparse, parse_qs

class WorkingNotesHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        """Handle POST requests for saving files"""
        if self.path == '/save-file':
            self.handle_save_file()
        else:
            self.send_error(404, "Endpoint not found")
    
    def handle_save_file(self):
        """Handle saving file content"""
        try:
            # Get the content length
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Parse JSON data
            data = json.loads(post_data.decode('utf-8'))
            filename = data.get('filename')
            content = data.get('content')
            
            if not filename or not content:
                self.send_error(400, "Missing filename or content")
                return
            
            # Security check: only allow saving to specific files
            allowed_files = ['index.html', 'admin.html']
            if filename not in allowed_files:
                self.send_error(403, "File not allowed")
                return
            
            # Save the file
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            
            # Send success response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'status': 'success', 'message': f'File {filename} saved successfully'}
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        except Exception as e:
            self.send_error(500, f"Error saving file: {str(e)}")
    
    def end_headers(self):
        """Add CORS headers for cross-origin requests"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        """Handle preflight OPTIONS requests"""
        self.send_response(200)
        self.end_headers()

def main():
    PORT = 8000
    
    with socketserver.TCPServer(("", PORT), WorkingNotesHandler) as httpd:
        print("🚀 Working Notes server running on http://localhost:8000")
        print("📝 Main site: http://localhost:8000/index.html")
        print("⚙️  Admin interface: http://localhost:8000/admin.html")
        print("Press Ctrl+C to stop the server")
        httpd.serve_forever()

if __name__ == "__main__":
    main() 