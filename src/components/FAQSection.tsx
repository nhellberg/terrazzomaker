import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function FAQSection() {
  return (
    <section className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is-terrazzo">
              <AccordionTrigger>What is Terrazzo?</AccordionTrigger>
              <AccordionContent>
                Terrazzo is a composite material consisting of chips of marble, quartz, granite, glass, or other suitable material, poured with a cementitious binder for chemical binding or epoxy resin for physical binding. Similar to mosaics, terrazzo creates beautiful speckled surfaces that have been used in architecture and design for centuries. Our pattern maker allows you to create digital versions of these classic terrazzo patterns for use in your design projects.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-to-use">
              <AccordionTrigger>How do I use the Terrazzo Pattern Maker?</AccordionTrigger>
              <AccordionContent>
                1. <strong>Adjust Pattern Settings:</strong> Use the sliders to control chip size and density to your liking.
                <br />
                2. <strong>Choose Colors:</strong> Select from our curated color palettes or customize the background color.
                <br />
                3. <strong>Add Texture:</strong> Experiment with different materials (marble, granite, glass) and texture levels.
                <br />
                4. <strong>Download:</strong> Choose your preferred size and format (PNG, JPG, or SVG) and download your pattern.
                <br />
                The preview updates in real-time as you make changes!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="formats">
              <AccordionTrigger>What file formats are available?</AccordionTrigger>
              <AccordionContent>
                <strong>PNG:</strong> Best for designs with transparency needs and web use. Lossless compression.
                <br />
                <strong>JPG:</strong> Smaller file size, perfect for backgrounds and print materials.
                <br />
                <strong>SVG:</strong> Vector format that scales to any size without quality loss. Perfect for large format printing and web use.
                <br />
                <br />
                We offer common preset sizes (1024×1024, 2048×2048, 1920×1080) as well as custom dimensions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="licensing">
              <AccordionTrigger>What's the license for generated patterns?</AccordionTrigger>
              <AccordionContent>
                All patterns generated with our Terrazzo Pattern Maker are completely free to use for both personal and commercial projects. No attribution required, though it's always appreciated! You have full rights to the patterns you create and download.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pricing">
              <AccordionTrigger>Is this tool free?</AccordionTrigger>
              <AccordionContent>
                Yes! The Terrazzo Pattern Maker is completely free to use. Generate and download as many patterns as you need without any limitations or subscriptions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tips">
              <AccordionTrigger>Tips for better patterns</AccordionTrigger>
              <AccordionContent>
                <strong>Density:</strong> Lower density (20-40%) creates more spacious, modern looks. Higher density (70-90%) gives classic, rich terrazzo appearance.
                <br />
                <strong>Chip Size:</strong> Mix different sizes by generating multiple patterns and layering them in your design software.
                <br />
                <strong>Colors:</strong> Choose palettes that complement your overall design. Monochrome works great for subtle backgrounds.
                <br />
                <strong>Texture:</strong> Add subtle texture for realism, but keep it low for digital use. Higher texture works well for print materials.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}