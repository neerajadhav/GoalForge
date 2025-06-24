### Project Overview

The **Generative AI Service** is a web application built using FastAPI that leverages advanced generative AI models to create content based on user inputs. This service offers two main capabilities: text generation and image-based content generation. By utilizing Google’s powerful generative models, it allows users to input prompts for both text and image generation tasks.

The service is designed to handle user interactions efficiently and securely, with features like image uploading, text-based prompts, and combining both elements to generate creative content. Additionally, the application supports converting markdown content into rich HTML, providing an enhanced presentation for the generated responses.

This service is ideal for use cases that require AI-driven content creation, such as generating descriptive text from images, creating creative writing, and producing AI-assisted visual outputs. Whether used in an internal tool or integrated into larger systems, this service provides a flexible and easy-to-use interface for generating AI-driven content.

### API Documentation:
```
https://ai.google.dev/models/gemini
```
#### Text Generation:

* Endpoint: `/gemini`
* Method: GET
* Parameters:
    * `query`: Text prompt for the model to generate (required).
* Example: `http://localhost:8000/gemini?query=Write a poem about a starry night sky`

#### Image-To-Text Generation:

* Endpoint: `/gemini/img`
* Method: GET
* Parameters:
    * `query`: Image prompt for the model to generate Text(required).
    * `image_url`: URL of the reference image (required).
* Example: `http://localhost:8000/gemini/img?query=Explain This Image&image_url=https://example.com/mountain-forest.jpg`

### Contributing:

We welcome contributions! Feel free to fork this repository, make improvements, and submit pull requests. Read the CONTRIBUTING.md file for guidelines.

### License:

This project is licensed under the MIT License. See the LICENSE file for details.

### Note:

* Use Google Cloud Platform API key.