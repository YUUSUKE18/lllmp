import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        boolean first = true;
        if (line != null) {
            String[] parts = line.trim().split("[:]+,[:]+");
            for (String part : parts) {
                int value = 0, freq = 0;
                if (part != null && part.trim().length() > 0) {
                    String[] values = part.trim().split(":");
                    if (values.length == 2) {
                        try {
                            value = Integer.parseInt(values[0]);
                            freq = Integer.parseInt(values[1]);
                            if (first || (value * freq) > sum) {
                                sum = value * freq;
                                count = freq;
                                first = false;
                            }
                        } catch (NumberFormatException e) {
                        }
                    }
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
