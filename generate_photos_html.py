import os
import re

def rename_images(directory: str, category: str):
    exts = ('.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG')
    files = [f for f in os.listdir(directory) if f.endswith(exts)]
    files.sort()

    for i, filename in enumerate(files, start=1):
        ext = os.path.splitext(filename)[1]
        new_name = f"{category}-{i}{ext}"
        old_path = os.path.join(directory, filename)
        new_path = os.path.join(directory, new_name)
        os.rename(old_path, new_path)
        print(f"Renamed: {filename} → {new_name}")


def generate_html(directory: str, category: str) -> str:
    files = sorted(os.listdir(directory))
    html = ""

    if category == "carousel":
        for i, f in enumerate(files):
            active = " active" if i == 0 else ""
            html += f'''
                <div class="carousel-item position-relative{active}" style="height: 100vh; min-height: 400px;">
                    <img class="position-absolute w-100 h-100" src="./img/{category}/{f}" style="object-fit: cover;">
                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div class="p-3" style="max-width: 900px;">
                            <h1 class="display-1 font-secondary text-white mt-n3 mb-md-4">Burcu & İlker</h1>
                            <div class="d-inline-block border-top border-bottom border-light py-3 px-4">
                                <h3 class="text-uppercase font-weight-normal text-white m-0" style="letter-spacing: 2px;">
                                    <i class="far fa-heart text-white"></i>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>'''
    elif category == "gallery":
        for f in files:
            html += f'''
            <div class="gallery-item">
                <img class="img-fluid w-100" src="./img/{category}/{f}" alt="">
                <a href="./img/{category}/{f}" data-lightbox="{category}">
                    <i class="fa fa-2x fa-plus text-white"></i>
                </a>
            </div>'''
    elif category == "story":
        for i, f in enumerate(files, start=1):
            if i % 2 == 1:
                html += f'''
                <div class="row">
                    <div class="col-md-6 text-center text-md-right">
                        <img class="img-fluid mr-md-3" src="./img/{category}/{f}" alt="" width="350" height="500">
                    </div>
                    <div class="col-md-6 text-center text-md-left">
                        <div class="h-100 d-flex flex-column justify-content-center p-4 ml-md-3">
                            <h4 class="mb-2">Story {i}</h4>
                            <p class="text-uppercase mb-2">Date</p>
                        </div>
                    </div>
                </div>'''
            else:
                html += f'''
                <div class="row">
                    <div class="col-md-6 text-center text-md-right">
                        <div class="h-100 d-flex flex-column justify-content-center p-4 mr-md-3">
                            <h4 class="mb-2">Story {i}</h4>
                            <p class="text-uppercase mb-2">Date</p>
                        </div>
                    </div>
                    <div class="col-md-6 text-center text-md-left">
                        <img class="img-fluid ml-md-3" src="./img/{category}/{f}" alt="" width="350" height="500">
                    </div>
                </div>'''
    else:
        raise ValueError("Unknown category. Use 'carousel', 'gallery', or 'story'.")

    return html.strip()


if __name__ == "__main__":
    for cat in ["carousel", "gallery", "story"]:
        folder = os.path.join("img", cat)
        rename_images(folder, cat)
        html_code = generate_html(folder, cat)

        output_file = f"{cat}_html_snippet.html"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(html_code)

        print(f"\n✅ Generated {output_file}")