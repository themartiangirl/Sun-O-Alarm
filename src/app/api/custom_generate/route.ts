// import { NextResponse, NextRequest } from "next/server";
// import { DEFAULT_MODEL, sunoApi } from "@/lib/SunoApi";
// import { corsHeaders } from "@/lib/utils";

// export const maxDuration = 60; // allow longer timeout for wait_audio == true
// export const dynamic = "force-dynamic";

// export async function POST(req: NextRequest) {
//   if (req.method === 'POST') {
//     try {
//       const body = await req.json();
//       const { prompt, tags, title, make_instrumental, model, wait_audio, isAlarmTone } = body;

//       // Modify the prompt if it's for an alarm tone
//       let customPrompt = prompt;
//       if (isAlarmTone) {
//         customPrompt = `Generate an ${tags} ${prompt} for an alarm tone`;
//       }

//       const audioInfo = await (await sunoApi).custom_generate(
//         customPrompt, 
//         tags, 
//         title,
//         Boolean(make_instrumental),
//         model || DEFAULT_MODEL,
//         Boolean(wait_audio)
//       );

//       // Log the response to inspect its structure
//       console.log("Custom Generate API Response:", audioInfo);

//       return new NextResponse(JSON.stringify(audioInfo), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//           ...corsHeaders
//         }
//       });
//     } catch (error: any) {
//       console.error('Error generating custom audio:', error.response?.data || error.message);
//       if (error.response?.status === 402) {
//         return new NextResponse(JSON.stringify({ error: error.response.data.detail }), {
//           status: 402,
//           headers: {
//             'Content-Type': 'application/json',
//             ...corsHeaders
//           }
//         });
//       }
//       return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//           ...corsHeaders
//         }
//       });
//     }
//   } else {
//     return new NextResponse('Method Not Allowed', {
//       headers: {
//         Allow: 'POST',
//         ...corsHeaders
//       },
//       status: 405
//     });
//   }
// }

// export async function OPTIONS(request: Request) {
//   return new Response(null, {
//     status: 200,
//     headers: corsHeaders
//   });
// }


import { NextResponse, NextRequest } from "next/server";
import { DEFAULT_MODEL, sunoApi } from "@/lib/SunoApi";
import { corsHeaders } from "@/lib/utils";

export const maxDuration = 60; // allow longer timeout for wait_audio == true
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { prompt, tags, title, make_instrumental, model, wait_audio, isAlarmTone } = body;

      // Modify the prompt if it's for an alarm tone
      let customPrompt = prompt;
      if (isAlarmTone) {
        customPrompt = `Generate an ${tags} ${prompt} for an alarm tone`;
      }

      const audioInfo = await (await sunoApi).custom_generate(
        customPrompt, 
        tags, 
        title,
        Boolean(make_instrumental),
        model || DEFAULT_MODEL,
        Boolean(wait_audio)
      );

      // Log the response to inspect its structure
      console.log("Custom Generate API Response:", audioInfo);

      return new NextResponse(JSON.stringify(audioInfo), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } catch (error: any) {
      console.error('Error generating custom audio:', error.response?.data || error.message);
      if (error.response?.status === 402) {
        return new NextResponse(JSON.stringify({ error: error.response.data.detail }), {
          status: 402,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }
      return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  } else {
    return new NextResponse('Method Not Allowed', {
      headers: {
        Allow: 'POST',
        ...corsHeaders
      },
      status: 405
    });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}
