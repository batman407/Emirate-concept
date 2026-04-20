import bpy
import math

# ==============================================================================
# EMIRATES CONCEPT - BLENDER CINEMATIC RENDER AUTOMATION SCRIPT
# 
# Instructions:
# 1. Open Blender and import your Airplane / Scene model.
# 2. Go to the "Scripting" tab at the top.
# 3. Paste this entire code into the text editor.
# 4. Click "Run Script" (or press Alt+P).
# 5. The script will automatically create a cinematic camera fly-by,
#    add beautiful lighting, and configure the render settings to MP4.
# ==============================================================================

def setup_cinematic_animation():
    # 1. CLEANUP PREVIOUS CAMERAS/LIGHTS (Optional, comment out if you want to keep yours)
    for obj in bpy.data.objects:
        if obj.type in ['CAMERA', 'LIGHT']:
            bpy.data.objects.remove(obj, do_unlink=True)

    # 2. RENDER SETTINGS FOR HIGH-QUALITY MP4
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'  # Use EEVEE for faster rendering, CYCLES for photorealism
    scene.cycles.samples = 128
    
    # 1080p Resolution
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.resolution_percentage = 100
    
    # Set framerate and length (10 seconds at 30 fps)
    scene.render.fps = 30
    scene.frame_start = 1
    scene.frame_end = 300
    
    # Output to MP4 Video
    scene.render.image_settings.file_format = 'FFMPEG'
    scene.render.ffmpeg.format = 'MPEG4'
    scene.render.ffmpeg.codec = 'H264'
    scene.render.ffmpeg.constant_rate_factor = 'HIGH'
    
    # Save the render output to your exact project folder (Change User if necessary)
    scene.render.filepath = r"C:\Users\HP\Desktop\Empreor'development project\EMIRATES\public\videos\hero-bg.mp4"

    # 3. ADD A CINEMATIC CAMERA
    bpy.ops.object.camera_add(location=(15, -15, 5))
    cam = bpy.context.object
    cam.name = "Cinematic_Camera"
    cam.rotation_euler = (math.radians(75), 0, math.radians(45))
    scene.camera = cam
    
    # Create an empty target for the camera to look at
    bpy.ops.object.empty_add(location=(0, 0, 0))
    target = bpy.context.object
    target.name = "Camera_Target"
    
    # Let the camera track the center of the scene (where your airplane should be)
    bpy.ops.object.constraint_add(type='TRACK_TO')
    cam.constraints["Track To"].target = target
    
    # 4. ANIMATE THE CAMERA (Smooth Orbit Fly-by)
    # Insert keyframe at Start (Frame 1)
    scene.frame_set(1)
    cam.location = (25, -20, 8)
    cam.keyframe_insert(data_path="location", index=-1)
    
    # Insert keyframe at End (Frame 300)
    scene.frame_set(300)
    cam.location = (-15, -25, 4)
    cam.keyframe_insert(data_path="location", index=-1)

    # 5. ADD CINEMATIC GOLDEN-HOUR LIGHTING
    # Main Sun Light
    bpy.ops.object.light_add(type='SUN', location=(10, -10, 10))
    sun = bpy.context.object
    sun.data.energy = 5.0
    sun.data.angle = math.radians(10) # Soft shadows
    sun.data.color = (1.0, 0.85, 0.7) # Warm golden hour tone
    
    # Add a soft blue ambient rim light
    bpy.ops.object.light_add(type='AREA', location=(-15, 15, 5))
    rim = bpy.context.object
    rim.data.energy = 800.0
    rim.data.size = 10.0
    rim.data.color = (0.6, 0.8, 1.0) # Cool sky blue
    
    # Add soft HDRI environment lighting if needed
    world = scene.world
    world.use_nodes = True
    bg_node = world.node_tree.nodes.get('Background')
    bg_node.inputs[0].default_value = (0.1, 0.1, 0.15, 1) # Dark cinematic sky

    print("==============================================")
    print("SUCCESS! Render Settings, Lighting, and Animation applied.")
    print(f"Output is set to: {scene.render.filepath}")
    print("Go to Render > Render Animation to generate your MP4!")
    print("==============================================")

setup_cinematic_animation()
