import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(System.in);
        long target = Long.parseLong(reader.readLine());
        List<Long> numbers = new ArrayList<>();
        
        String line;
        while ((line = reader.readLine()) != null) {
            try {
                numbers.add(Long.parseLong(line));
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        
        long pairs = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairs++;
                }
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
