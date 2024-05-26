import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutUs (){
    return(
        <>
    <div className="about-us">
    <Card>
      <CardHeader>
        <CardTitle>About Us</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>Pulsar is your go-to destination for all space-related products. Discover the wonders of the universe with our high-quality telescopes and accessories. Our mission is to make space exploration accessible to everyone.</p>
        </CardDescription>
      </CardContent>
    </Card>
  </div>
  </>
    )
}